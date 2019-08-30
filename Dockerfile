# !!重要!! 参考下面格式, 自定义 应用的dockerFile
FROM registry.haier.net/library/nginx:1.13.8-alpine
COPY l9QWuMfmPy.txt /usr/share/nginx
COPY EkXH2GdkPn.txt /usr/share/nginx
COPY nginx.conf /etc/nginx/conf.d
COPY dist/ /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
