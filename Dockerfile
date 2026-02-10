# Stage 1: Serve with Nginx
FROM nginx:alpine
COPY dist/digital-factory-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
