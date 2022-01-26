package com.example.pis.repositories

import com.example.pis.models.MyTask
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<MyTask, Int> {

}