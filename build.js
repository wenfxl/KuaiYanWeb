//打包预构建,删除编译目录下,含子目录后缀非.go的文件
import fs from 'fs';
import path from 'path';

const distPathAdmin = path.resolve('./dist/VueAdmin');
const distPathAgent = path.resolve('./dist/VueAgent');

[distPathAdmin, distPathAgent].forEach(p => {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

if (fs.existsSync(distPath)) {
    fs.readdirSync(distPath).forEach((file) => {
        const filePath = path.join(distPath, file);
        const isGoFile = file.endsWith('.go');

        if (!isGoFile) {
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteNonGoFiles(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    });
}

function deleteNonGoFiles(directoryPath) {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const isGoFile = file.endsWith('.go');

        if (!isGoFile) {
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteNonGoFiles(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    });

    //fs.rmdirSync(directoryPath);
}
