import { Router } from "express";
import { ping } from "../controller";
import { add_inbox, get_user_inbox, update_inbox } from "../controller/Inbox";
import { add_assignee, add_tag, create_comment, create_project, create_project_issue, delete_assignee, delete_comment, delete_issues, delete_project, delete_tag, get_all_user_projects, get_comments, get_issue_by_id, get_project_by_id, get_user_issues, get_user_projects, update_comment, update_issue, update_project, update_system_details, update_tag, update_tags } from "../controller/projects";
import { add_team_member, create_team, delete_team, get_user_teams, update_team } from "../controller/team";
import { login, logout, refreshtoken } from "../controller/tokens";
import { add_user_project, create_auth0_user, create_user, get_user, update_user, update_user_project } from "../controller/user";
import { auth_middleware } from "../middleware/auth";
import multer from "multer"
import { add_asset, add_issue_asset, delete_asset, delete_issue_asset, get_asset } from "../controller/assets";
const upload = multer({dest: "/uploads"})


const router = Router()

router.use(auth_middleware)
router.use(upload.single("asset"))

//ping the server
router.get("/", ping)

router.post("/user", create_user)
router.post("/user/project/:user_name", add_user_project)
router.put("/user/project/:user_name", update_user_project)
router.post("/user/auth0", create_auth0_user)
router.put("/user", update_user)
router.get("/user", get_user)

router.post("/project", create_project)
router.delete("/project/:project_id", delete_project)
router.put("/project/:project_id", update_project)
// router.get("/projects", get_user_projects)
router.get("/project/:project_id", get_project_by_id)
router.get("/projects", get_all_user_projects)

router.post("/issue/:project_id", create_project_issue)
router.put("/issue/:issue_id", update_issue)
router.delete("/issues/:issue_id", delete_issues)

router.post("/comment/:issue_id", create_comment)
router.put("/comment/:comment_id", update_comment)
router.delete("/comment/:comment_id", delete_comment)
router.get("/comments", get_comments)

router.post("/assignee/:issue_id", add_assignee)
router.delete("/assignee/:issue_id/:assignee_id", delete_assignee)

router.post("/tag/:issue_id", add_tag)
router.put("/tag/:tag_name", update_tag)
router.delete("/tag/:issue_id/:tag_id", delete_tag)
router.put("/tags/:issue_id", update_tags)


router.post("/system_details/:issue_id", update_system_details)

router.put("/issue/:issue_id", update_issue)
router.get("/issues", get_user_issues)
router.get("/issue/:issue_id", get_issue_by_id)

router.post("/team", create_team)
router.get("/teams", get_user_teams)


router.post("/team/:team_id", add_team_member)
router.put("/team/:team_id", update_team)
router.delete("/team/:team_id", delete_team)

//auth
router.post("/login", login)
router.post("/token", refreshtoken)
router.post("/logout", logout)

router.post("/inbox", add_inbox)
router.get("/inbox", get_user_inbox)
router.put("/inbox/:inbox_id", update_inbox)


//assets
router.post("/assets", add_asset)
router.put("/assets/:issue_id", add_issue_asset)
router.get("/asset/:key", get_asset)
router.delete("/asset/:key", delete_asset)
router.delete("/asset/:issue_id/:key", delete_issue_asset)


module.exports = router