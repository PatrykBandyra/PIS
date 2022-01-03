package com.example.pis.controller

import com.example.pis.dtos.CreateTaskDTO
import com.example.pis.dtos.Message
import com.example.pis.models.MyTask
import com.example.pis.services.TaskService
import com.example.pis.services.UserService
import io.jsonwebtoken.Jwts
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/task")
class TaskController(private val taskService: TaskService, private val userService: UserService) {

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

}