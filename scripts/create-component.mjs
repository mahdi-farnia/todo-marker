import { createInterface } from 'node:readline/promises';
import { access, constants, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';

const createTemplate = (name = '') => `import { Box } from "@chakra-ui/react";

const ${name}: React.FC = () => (
    <Box>${name} works!</Box>
);

export default ${name};
`;

const io = createInterface(process.stdin, process.stdout);

const componentsName =
  process.argv.slice(2) ?? (await io.question('? Component name: ')).split(' ');

const cwd = process.cwd();

for (const cmpName of componentsName) {
  await create(cmpName, `${cwd}/src/components/${cmpName}.tsx`);
}

async function create(cmpName = '', path = '') {
  try {
    await access(path, constants.F_OK);

    const shouldOverwrite = await io.question(
      `! Component ${cmpName} already exists, overwrite it? (y/n): `
    );

    if (!/y|yes/i.test(shouldOverwrite)) {
      console.log('! Cancelled');
      io.close();
      process.exit(0);
    }
  } catch (_) {
  } finally {
    await writeFile(path, createTemplate(basename(cmpName)), 'utf8');
    console.log(`✅ ${cmpName}.tsx Created Successfully`);
  }
}

io.close();
