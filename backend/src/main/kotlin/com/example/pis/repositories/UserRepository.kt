package com.example.pis.repositories

import com.example.pis.models.MyUser
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<MyUser, Int> {

    fun findByEmail(email: String): MyUser?

}