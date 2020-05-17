FROM node:10
RUN mkdir -p /user/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN chmod +x /usr/src/app/run.sh
RUN npm install --force && npm cache verify
EXPOSE 5000
ENV PORT=5000
ENV MONGOURI='mongodb+srv://jimoh:test@cluster0-ndzbs.mongodb.net/test?retryWrites=true&w=majority'
ENV JWT_SECRET="jcjendieiecnecjeekjejendje"
CMD ./run.sh