const fs = require('fs');
const path = require('path');

/**
 * Splits an OBJ file into multiple files based on object markers (o objN)
 * Properly handles vertex index offsets when splitting - remaps face indices to local indices
 * 
 * Usage: node scripts/split_obj.js <input_file> [output_dir]
 * Example: node scripts/split_obj.js public/models/rocketL1.obj public/models
 */
function splitObjFile(inputFile, outputDir = null) {
  // Determine output directory (default to same directory as input)
  if (!outputDir) {
    outputDir = path.dirname(inputFile);
  }

  // Read the input file
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n');

  // Find all object markers and their line numbers
  const objectMarkers = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('o ')) {
      const objName = line.substring(2).trim();
      // Extract number from obj name (e.g., "obj1" -> 1, "obj10" -> 10, "Cube.001" -> 1)
      const match = objName.match(/obj(\d+)/);
      const cubeMatch = objName.match(/Cube(?:\.(\d+))?/);
      if (match) {
        objectMarkers.push({
          lineIndex: i,
          objName: objName,
          objNumber: parseInt(match[1], 10)
        });
      } else if (cubeMatch) {
        // Handle Cube, Cube.001, Cube.002, etc.
        const objNumber = cubeMatch[1] ? parseInt(cubeMatch[1], 10) : 0;
        objectMarkers.push({
          lineIndex: i,
          objName: objName,
          objNumber: objNumber + 1 // Cube -> 1, Cube.001 -> 2, etc.
        });
      } else {
        // For any other object name, use sequential numbering
        objectMarkers.push({
          lineIndex: i,
          objName: objName,
          objNumber: objectMarkers.length + 1
        });
      }
    }
  }

  // Sort by line index to process in order
  objectMarkers.sort((a, b) => a.lineIndex - b.lineIndex);

  if (objectMarkers.length === 0) {
    console.log('No objects found in file');
    return;
  }

  console.log(`Found ${objectMarkers.length} objects:`);
  objectMarkers.forEach(marker => {
    console.log(`  ${marker.objName} at line ${marker.lineIndex + 1}`);
  });

  // Extract header (lines before first object)
  const headerLines = [];
  for (let i = 0; i < objectMarkers[0].lineIndex; i++) {
    headerLines.push(lines[i]);
  }

  // Process each object
  let globalVCount = 0;  // Global vertex count (accumulated across all objects)
  let globalVnCount = 0; // Global normal count
  let globalVtCount = 0; // Global texture coordinate count

  for (let i = 0; i < objectMarkers.length; i++) {
    const startLine = objectMarkers[i].lineIndex;
    const endLine = (i < objectMarkers.length - 1) 
      ? objectMarkers[i + 1].lineIndex 
      : lines.length;
    
    const objNumber = objectMarkers[i].objNumber;
    const baseName = path.basename(inputFile, path.extname(inputFile));
    const outputFileName = `${baseName}_${objNumber}.obj`;
    const outputPath = path.join(outputDir, outputFileName);
    
    // Collect all lines for this object
    const objectLines = [];
    let localVCount = 0;
    let localVnCount = 0;
    let localVtCount = 0;

    // First pass: collect vertices, normals, texture coords and count them
    for (let j = startLine; j < endLine; j++) {
      const line = lines[j];
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('v ')) {
        localVCount++;
        objectLines.push({ type: 'v', line: line, originalLine: j });
      } else if (trimmedLine.startsWith('vn ')) {
        localVnCount++;
        objectLines.push({ type: 'vn', line: line, originalLine: j });
      } else if (trimmedLine.startsWith('vt ')) {
        localVtCount++;
        objectLines.push({ type: 'vt', line: line, originalLine: j });
      } else if (trimmedLine.startsWith('o ')) {
        objectLines.push({ type: 'o', line: line, originalLine: j });
      } else if (trimmedLine.startsWith('f ')) {
        objectLines.push({ type: 'f', line: line, originalLine: j });
      } else {
        // Other lines (comments, mtllib, usemtl, etc.)
        objectLines.push({ type: 'other', line: line, originalLine: j });
      }
    }

    // Second pass: remap face indices
    const outputLines = [];
    
    // Add header
    outputLines.push(...headerLines);

    // Process object lines and remap face indices
    for (const item of objectLines) {
      if (item.type === 'f') {
        // Parse and remap face indices
        const faceLine = item.line.trim();
        const faceMatch = faceLine.match(/^f\s+(.+)$/);
        if (faceMatch) {
          const indicesStr = faceMatch[1];
          // Split by whitespace to get individual vertex references
          const vertexRefs = indicesStr.split(/\s+/);
          const remappedRefs = vertexRefs.map(ref => {
            // Handle different face formats:
            // v
            // v/vt
            // v//vn
            // v/vt/vn
            const parts = ref.split('/');
            
            if (parts.length === 1) {
              // Just vertex index
              const vIndex = parseInt(parts[0], 10);
              if (isNaN(vIndex)) return ref;
              const remapped = vIndex - globalVCount;
              return remapped > 0 ? remapped.toString() : ref;
            } else if (parts.length === 2) {
              // v/vt format
              const vIndex = parseInt(parts[0], 10);
              const vtIndex = parts[1] ? parseInt(parts[1], 10) : null;
              
              let remapped = '';
              if (!isNaN(vIndex)) {
                const remappedV = vIndex - globalVCount;
                remapped = remappedV > 0 ? remappedV.toString() : parts[0];
              } else {
                remapped = parts[0];
              }
              
              remapped += '/';
              
              if (vtIndex !== null && !isNaN(vtIndex)) {
                const remappedVt = vtIndex - globalVtCount;
                remapped += remappedVt > 0 ? remappedVt.toString() : parts[1];
              } else {
                remapped += parts[1] || '';
              }
              
              return remapped;
            } else if (parts.length === 3) {
              // v/vt/vn or v//vn format
              const vIndex = parseInt(parts[0], 10);
              const vtIndex = parts[1] ? parseInt(parts[1], 10) : null;
              const vnIndex = parts[2] ? parseInt(parts[2], 10) : null;
              
              let remapped = '';
              
              // Vertex index
              if (!isNaN(vIndex)) {
                const remappedV = vIndex - globalVCount;
                remapped = remappedV > 0 ? remappedV.toString() : parts[0];
              } else {
                remapped = parts[0];
              }
              
              remapped += '/';
              
              // Texture coordinate index (may be empty)
              if (vtIndex !== null && !isNaN(vtIndex)) {
                const remappedVt = vtIndex - globalVtCount;
                remapped += remappedVt > 0 ? remappedVt.toString() : parts[1];
              } else {
                remapped += parts[1] || '';
              }
              
              remapped += '/';
              
              // Normal index (may be empty)
              if (vnIndex !== null && !isNaN(vnIndex)) {
                const remappedVn = vnIndex - globalVnCount;
                remapped += remappedVn > 0 ? remappedVn.toString() : parts[2];
              } else {
                remapped += parts[2] || '';
              }
              
              return remapped;
            }
            
            return ref; // Fallback
          });
          
          outputLines.push('f ' + remappedRefs.join(' '));
        } else {
          outputLines.push(item.line); // Fallback if parsing fails
        }
      } else {
        // All other lines are added as-is
        outputLines.push(item.line);
      }
    }
    
    // Write file
    fs.writeFileSync(outputPath, outputLines.join('\n'), 'utf-8');
    console.log(`Created ${outputFileName} (${endLine - startLine} lines, ${localVCount} vertices, ${localVnCount} normals, ${localVtCount} texture coords)`);
    
    // Update global counts for next object
    globalVCount += localVCount;
    globalVnCount += localVnCount;
    globalVtCount += localVtCount;
  }

  console.log(`\nSplit complete! Created ${objectMarkers.length} files in ${outputDir}`);
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scripts/split_obj.js <input_file> [output_dir]');
  console.log('Example: node scripts/split_obj.js public/models/rocketL1.obj public/models');
  process.exit(1);
}

const inputFile = args[0];
const outputDir = args[1] || null;

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

if (outputDir && !fs.existsSync(outputDir)) {
  console.error(`Error: Output directory not found: ${outputDir}`);
  process.exit(1);
}

splitObjFile(inputFile, outputDir);

