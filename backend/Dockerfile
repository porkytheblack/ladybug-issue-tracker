FROM node:16.14.2

WORKDIR /app 

COPY package*.json /app/
COPY yarn.lock /app/
COPY tsconfig.json /app/

RUN yarn add global typescript

RUN yarn 

COPY . /app/

ENV user_name=don
ENV db_password=gOJPGMmzISZFBo1Y
ENV db_uri=mongodb+srv://don:gOJPGMmzISZFBo1Y@cluster0.kpjnu.mongodb.net/?retryWrites=true&w=majority
ENV PORT=8080
ENV access_token=fd48ffa108f9f3ccc4a3e0073eaf5bfdc9d5bf8e04ac68ddd27f291e3d2d4dc9099032606abc902e22e1013249a1e6bd4eb7b852d35ebc9ce7d72b5acaf769a8
ENV refresh_token=5c9517370ebb83a03f51b129968e72146136c8499ab662965d6f7a453af81679b769bed955ba59e457ec9bbbab1bc303e8c8d1919a5dd28da39f2d4b0c9d77be 
ENV client_id=f6Lvhk6x1hMTJCbGD1utLZR0gEocY19o
ENV client_secret=7SdlTy3YpmsgOIGyCslJezAcmPZcP-m0slaVDu54rplx4mOsQ6Vfa7M5EN5c2oXo
ENV audience=https://dev-1r9889va.us.auth0.com/api/v2/
ENV bucket_name=ladybugbugtrackerbucket
ENV bucket_region=us-east-1
ENV aws_access_key=AKIAUPE2GGCNVM4QDS4Z
ENV aws_secret_key=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
ENV me=http://localhost

EXPOSE 8080 

CMD ["yarn" , "run", "dev"]






