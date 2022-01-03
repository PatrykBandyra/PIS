package com.example.pis.services

import com.example.pis.models.MyTask
import com.example.pis.repositories.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(private val taskRepository: TaskRepository) {

    fun save(task: MyTask): MyTask = this.taskRepository.save(task)
}