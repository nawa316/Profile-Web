const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'app', 'admin');
const entities = ['educations', 'certifications', 'achievements'];

entities.forEach(ent => {
  // Fix list page
  const listFile = path.join(adminDir, ent, 'page.tsx');
  if (fs.existsSync(listFile)) {
    let content = fs.readFileSync(listFile, 'utf8');
    content = content.replace(/\.\.\/\.\.\/components/g, '../components');
    fs.writeFileSync(listFile, content);
  }

  // Fix create page
  const createFile = path.join(adminDir, ent, 'create', 'page.tsx');
  if (fs.existsSync(createFile)) {
    let content = fs.readFileSync(createFile, 'utf8');
    content = content.replace(/\.\.\/\.\.\/\.\.\/components/g, '../../components');
    fs.writeFileSync(createFile, content);
  }

  // Fix edit page
  const editFile = path.join(adminDir, ent, '[id]', 'page.tsx');
  if (fs.existsSync(editFile)) {
    let content = fs.readFileSync(editFile, 'utf8');
    content = content.replace(/\.\.\/\.\.\/\.\.\/components/g, '../../components');
    fs.writeFileSync(editFile, content);
  }
});

console.log('Imports fixed!');
