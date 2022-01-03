package com.example.pis.services

import com.example.pis.models.MyUser
import com.example.pis.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    fun save(user: MyUser): MyUser = this.userRepository.save(user)

    fun findByEmail(email: String): MyUser? = this.userRepository.findByEmail(email)

    fun getById(id: Int): MyUser = this.userRepository.getById(id)
}