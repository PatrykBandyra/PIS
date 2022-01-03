package com.example.pis.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.persistence.*

@Entity
@Table(name = "MY_USER")
class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column
    var name = ""

    @Column(unique = true)
    var email = ""

    @Column
    var password = ""
        @JsonIgnore
        get() = field
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }

    @OneToMany(mappedBy = "user", cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    var tasks: MutableList<MyTask> = mutableListOf()

    fun comparePassword(password: String): Boolean = BCryptPasswordEncoder().matches(password, this.password)
}