const fs = require('fs');
const path = require('path');
const { checkLinks } = require('markdown-link-check');

// 设置检查选项
const options = {
    baseUrl: 'https://yourwebsite.com', // 你的网站基础URL
    validateSSL: true, // 验证SSL证书
    timeout: 10000, // 超时时间，单位毫秒
};

// 读取指定目录下的所有 Markdown 文件
function readMarkdownFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    return files.reduce((acc, file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            return [...acc, ...readMarkdownFiles(filePath)];
        }
        if (filePath.endsWith('.md')) {
            return [...acc, filePath];
        }
        return acc;
    }, []);
}

// 检查所有 Markdown 文件中的链接
async function checkAllMarkdownLinks(markdownFiles) {
    let totalErrors = 0;
    for (const filePath of markdownFiles) {
        console.log(`Checking links in ${filePath}...`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const links = content.match(/\[.*?\]\(http[s]?:\/\/[^\s)]+\)/g) || [];
        for (const link of links) {
            const url = link.slice(link.indexOf('(') + 1, -1);
            try {
                const result = await checkLinks(url, options);
                if (result.status === 'dead') {
                    console.error(`${filePath}: Dead link found: ${url}`);
                    totalErrors++;
                }
            } catch (error) {
                console.error(`Error checking link ${url}: ${error.message}`);
            }
        }
    }
    console.log(`Checked all files. Found ${totalErrors} dead link(s).`);
}

// 主函数
async function main() {
    const dirToCheck = './docs'; // 设置需要检查的目录路径
    const markdownFiles = readMarkdownFiles(dirToCheck);
    await checkAllMarkdownLinks(markdownFiles);
}

main().catch(error => {
    console.error('An error occurred:', error);
});
