import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ImageTagConverter {

    public static void main(String[] args) {
        if (args.length != 2) {
            System.err.println("Usage: java ImageTagConverter <input-file> <output-file>");
            return;
        }

        String inputFile = args[0];
        String outputFile = args[1];

        try {
            // 读取文件内容
            String content = new String(Files.readAllBytes(Paths.get(inputFile)), StandardCharsets.UTF_8);

            // 定义正则表达式模式，匹配以 <img ...> 开始的图片标签
            Pattern pattern = Pattern.compile("<img\\s+src=\"([^\"\\s]+)\"\\s+alt=\"([^\"\\s]+)\"\\s*/?>");

            // 创建Matcher对象
            Matcher matcher = pattern.matcher(content);

            // 替换匹配的图像标签
            StringBuffer replacedContent = new StringBuffer();
            while (matcher.find()) {
                matcher.appendReplacement(replacedContent, "![]($1)");
            }
            matcher.appendTail(replacedContent);

            // 写入替换后的内容到新文件
            Files.write(Paths.get(outputFile), replacedContent.toString().getBytes(StandardCharsets.UTF_8));

            System.out.println("Image tags have been converted and saved to " + outputFile);
        } catch (IOException e) {
            System.err.println("Error reading or writing file: " + e.getMessage());
        }
    }
}
