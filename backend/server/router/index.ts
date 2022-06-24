import { Router } from "express";
import { ping } from "../controller";
import { add_assignee, add_tag, create_comment, create_project, create_project_issue, delete_assignee, delete_comment, delete_issues, delete_project, delete_tag, update_comment, update_issue, update_project, update_system_details, update_tag } from "../controller/projects";
import { add_team_member, create_team } from "../controller/team";
import { add_user_project, create_user, update_user_project } from "../controller/user";


const router = Router()

//ping the server
router.get("/", ping)

router.post("/user", create_user)
router.post("/user/project/:user_name", add_user_project)
router.put("/user/project/:user_name", update_user_project)


router.post("/project", create_project)
router.delete("/project/:project_name", delete_project)
router.put("/project/:project_id", update_project)

router.post("/issue/:project_id", create_project_issue)
router.put("/issue/:issue_id", update_issue)
router.delete("/issues/:issue_id", delete_issues)

router.post("/comment/:issue_id", create_comment)
router.put("/comment/:comment_id", update_comment)
router.delete("/comment/:comment_id", delete_comment)

router.post("/assignee/:issue_id", add_assignee)
router.delete("/assignee/:user_name", delete_assignee)

router.post("/tag/:issue_id", add_tag)
router.put("/tag/:tag_name", update_tag)
router.delete("/tag/:tag_name", delete_tag)

router.post("/system_details/:issue_id", update_system_details)

router.put("/issue/:issue_id", update_issue)

router.post("/team", create_team)

router.post("/team/:team", add_team_member)


module.exports = router