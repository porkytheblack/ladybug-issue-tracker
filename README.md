
  <p align="center">
    <img src="https://res.cloudinary.com/db7gfp5kb/image/upload/v1657446568/ladybug-cloud-assets/ladybug_k3tb0u.png" style="width: 100px;" alt="ladybug" />
  </p>
  <h1 align="center">
      ladybug
  </h1>
  <p align="center" >built from scratch with</p>
  <p align="center" style="display: flex; flex-direction: flex-row; width: 100%; align-items: center; justify-content: space-around; padding: 20px 10px; " >
      <img src="https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486356/ladybug-cloud-assets/next_logo_hor7wr.png" style="width: 150px;" />
     <img src="https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486445/ladybug-cloud-assets/node_logo_ia7lx7.png" style="width: 150px;" />
  </p>
    

  <p align="center" >
  <a align="center" href="https://doncodes.xyz" >
    👉 the site
  </a>
  </p>


## Ingredeints
- Express.js, for the server,
- MongoDb, for the database,
- S3 bucket for storage of user assets,
- JWT for security i.e authentication and authorization,
- Next.js for the frontend
- Ant design for the UI
- and brought together with Docker Compose and Nginx

## Features
- Collaboration, users can create teams to which they can invite other users on the platform. These teams are then used when creating projects.
  - e.g creating a team called Frontend to work on the frontend aspects of a website
  
  ![team](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486666/ladybug-cloud-assets/add_team_x3haos.png)
  

- Projects, A team can organize all its issues around a single project, this ensures all issues are organized.

![projects](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486668/ladybug-cloud-assets/projects_fm5ofw.png)


- A data driven dashboard. The project overview, is designed to enable the user to get a feel, of the issues on their plate at a glance, along with usefull statistics about the project they are working on.

![clipboard.png](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486668/ladybug-cloud-assets/manage_issues_oh8vbx.png)


- In issue chat, so that you can talk to your collaborators as an issue progresses

![issueview](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486667/ladybug-cloud-assets/comments_rkjp1f.png)

![activity](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486840/ladybug-cloud-assets/activity_ygp8sk.png)


- An inbox that lets you view invites to join teams as well as messages from other team members, or users

![inbox](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486846/ladybug-cloud-assets/inbox_read_z6b46s.png)


- Account personalisation, you can change your account display details, as well as your avatar depending on how you feel 😁, the avatars are from the [schmoe collection](https://joeschmoe.io) 

![user](https://res.cloudinary.com/db7gfp5kb/image/upload/v1657486964/ladybug-cloud-assets/username_ps5ncw.png)

## Deployment
I deployed it on Google Cloud Platform, with Cloud Engine. I created a Cloud engine instance, and used docker compose to bring together the frontend and backend containers, using nginx.

## Conclusion
This was a fun build 😁😁
