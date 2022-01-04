package com.example.pis.controller

import com.example.pis.dtos.CreateTaskDTO
import com.example.pis.dtos.Message
import com.example.pis.dtos.ObjectIdDTO
import com.example.pis.models.MyTask
import com.example.pis.models.MyUser
import com.example.pis.services.TaskService
import com.example.pis.services.UserService
import io.jsonwebtoken.Jwts
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/task")
class TaskController(private val taskService: TaskService, private val userService: UserService) {

    /**
     *  Creates task for specific user
     */
    @PostMapping("create")
    fun createTask(@RequestBody body: CreateTaskDTO, @CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("unauthenticated"))
            }

            val cookieBody = Jwts.parser().setSigningKey("verySecretString").parseClaimsJws(jwt).body

            val myTask = MyTask()
            myTask.url = body.url
            myTask.query = body.query
            myTask.type = body.type
            myTask.frequency = body.frequency
            myTask.user = this.userService.getById(cookieBody.issuer.toInt())

            this.taskService.save(myTask)

            return ResponseEntity.ok(Message("Task created!"))

        } catch (e: Exception) {
            return ResponseEntity.ok(Message("Something went wrong!"))
        }
    }

    /**
     *  Returns user task objects with their whole history of changes
     */
    @GetMapping("get-user-tasks")
    fun getUserTasks(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("unauthenticated"))
            }

            val cookieBody = Jwts.parser().setSigningKey("verySecretString").parseClaimsJws(jwt).body

            return ResponseEntity.ok(this.userService.getById(cookieBody.issuer.toInt()).tasks)

        } catch (e: Exception) {
            return ResponseEntity.ok(Message("Something went wrong!"))
        }
    }

    /**
     *  Returns user task object with specific id with and its whole history of changes
     */
    @GetMapping("get-user-task")
    fun getUserTask(@RequestBody body: ObjectIdDTO, @CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("unauthenticated"))
            }

            val cookieBody = Jwts.parser().setSigningKey("verySecretString").parseClaimsJws(jwt).body

            val user: MyUser = this.userService.getById(cookieBody.issuer.toInt())

            // Check if task with given id exists in user tasks
            var isUserTask = false
            user.tasks.forEach { task ->
                if (task.id == body.id) {
                    isUserTask = true
                    return@forEach
                }
            }

            if (isUserTask) {
                return ResponseEntity.ok(taskService.findById(body.id))
            }

            return ResponseEntity.ok(Message("Task with given id doesn't belong to a user!"))

        } catch (e: Exception) {
            return ResponseEntity.ok(Message("Something went wrong!"))
        }
    }

//    /**
//     * Deletes user task with specific id
//     */
//    @PostMapping("delete")
//    fun deleteUserTask(@RequestBody body: ObjectIdDTO, @CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
//        try {
//            if (jwt == null) {
//                return ResponseEntity.status(401).body(Message("unauthenticated"))
//            }
//
//            val cookieBody = Jwts.parser().setSigningKey("verySecretString").parseClaimsJws(jwt).body
//
//            val user: MyUser = this.userService.getById(cookieBody.issuer.toInt())
//
//            // Check if task with given id exists in user tasks
//            var isUserTask = false
//            user.tasks.forEach { task ->
//                if (task.id == body.id) {
//                    isUserTask = true
//                    return@forEach
//                }
//            }
//
//            // Delete task if it belongs to a user
//            if (isUserTask) {
//                user.tasks.remove(this.taskService.findById(body.id).get())
////                this.taskService.deleteById(body.id)
//                return ResponseEntity.ok(Message("Task deleted successfully!"))
//            }
//
//            return ResponseEntity.ok(Message("Task doesn't belong to a user!"))
//
//        } catch (e: Exception) {
//            return ResponseEntity.ok(Message("Something went wrong!"))
//        }
//    }


}