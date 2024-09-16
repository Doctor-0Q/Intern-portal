import fs from 'fs/promises';
import path from 'path';

async function cleanupTempFolder() {
  const tempDir = path.join('Documents', 'temp');
  try {
    const files = await fs.readdir(tempDir);
    for (const file of files) {
      await fs.unlink(path.join(tempDir, file));
    }
    console.log('Temp folder cleaned');
  } catch (err) {
    console.error('Error cleaning temp folder:', err);
  }
}

export default cleanupTempFolder;