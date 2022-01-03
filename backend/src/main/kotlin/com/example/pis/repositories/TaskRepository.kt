package com.example.pis.repositories

import com.example.pis.models.MyTask
import org.springframework.data.jpa.repository.JpaRepository

interface TaskRepository : JpaRepository<MyTask, Int> {
}