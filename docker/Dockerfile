FROM nginx:alpine

# Install Git
RUN apk update && apk add git

# Remove existing contents of the Nginx web root
RUN rm -rf /usr/share/nginx/html/*

# Clone the Chess PGN Trainer Git Repo
RUN git clone https://github.com/rodpolako/Chess-PGN-Trainer.git /usr/share/nginx/html

# Verify File Permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
