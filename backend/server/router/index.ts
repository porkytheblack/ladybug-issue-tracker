import { Router } from "express";
import { ping } from "../controller";
import { add_inbox, get_user_inbox, update_inbox } from "../controller/Inbox";
import { add_assignee, add_tag, create_comment, create_project, create_project_issue, delete_assignee, delete_comment, delete_issues, delete_project, delete_tag, get_comments, get_issue_by_id, get_project_by_id, get_user_issues, get_user_projects, update_comment, update_issue, update_project, update_system_details, update_tag, update_tags } from "../controller/projects";
import { add_team_member, create_team, get_user_teams, update_team } from "../controller/team";
import { login } from "../controller/tokens";
import { add_user_project, create_auth0_user, create_user, update_user_project } from "../controller/user";
import { auth_middleware } from "../middleware/auth";


const router = Router()

router.use(auth_middleware)

//ping the server
router.get("/", ping)

router.post("/user", create_user)
router.post("/user/project/:user_name", add_user_project)
router.put("/user/project/:user_name", update_user_project)
router.post("/user/auth0", create_auth0_user)


router.post("/project", create_project)
router.delete("/project/:project_name", delete_project)
router.put("/project/:project_id", update_project)
router.get("/projects", get_user_projects)
router.get("/project/:project_id", get_project_by_id)

router.post("/issue/:project_id", create_project_issue)
router.put("/issue/:issue_id", update_issue)
router.delete("/issues/:issue_id", delete_issues)

router.post("/comment/:issue_id", create_comment)
router.put("/comment/:comment_id", update_comment)
router.delete("/comment/:comment_id", delete_comment)
router.get("/comments", get_comments)

router.post("/assignee/:issue_id", add_assignee)
router.delete("/assignee/:user_name", delete_assignee)

router.post("/tag/:issue_id", add_tag)
router.put("/tag/:tag_name", update_tag)
router.delete("/tag/:tag_name", delete_tag)
router.put("/tags/:issue_id", update_tags)


router.post("/system_details/:issue_id", update_system_details)

router.put("/issue/:issue_id", update_issue)
router.get("/issues", get_user_issues)
router.get("/issue/:issue_id", get_issue_by_id)

router.post("/team", create_team)
router.get("/teams", get_user_teams)


router.post("/team/:team_id", add_team_member)
router.put("/team/:team_id", update_team)


router.post("/login", login)

router.post("/inbox", add_inbox)
router.get("/inbox", get_user_inbox)
router.put("/inbox/:inbox_id", update_inbox)


module.exports = router