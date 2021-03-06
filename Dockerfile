# !!重要!! 参考下面格式, 自定义 应用的dockerFile
FROM registry.haier.net/library/nginx:1.13.8-alpine
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY l9QWuMfmPy.txt /usr/share/nginx
COPY EkXH2GdkPn.txt /usr/share/nginx
COPY MP_verify_Lc9jZNakJnfulEK4.txt /usr/share/nginx
COPY MP_verify_KOiX2H4p4UG5DdkF.txt /usr/share/nginx
COPY MP_verify_BDlNNfLHLLk5qdbE.txt /usr/share/nginx
RUN /bin/sh  -c "rm -rf /etc/nginx/conf.d/default.conf"
COPY nginx.conf /etc/nginx/conf.d
COPY dist/ /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
