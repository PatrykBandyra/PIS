package com.example.pis.controller

import com.example.pis.dtos.LoginDTO
import com.example.pis.dtos.Message
import com.example.pis.dtos.RegisterDTO
import com.example.pis.models.MyUser
import com.example.pis.services.UserService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("api")
class AuthController(private val userService: UserService) {

    @PostMapping("register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<Any> {
        try {
            val myUser = MyUser()
            myUser.name = body.name
            myUser.email = body.email
            myUser.password = body.password

            return ResponseEntity.ok(this.userService.save(myUser))

        } catch (e: Exception) {
            return ResponseEntity.ok(Message("Account with such email already exists"))
        }
    }

    @PostMapping("login")
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Any> {

        val myUser = this.userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("Invalid data!"))

        if (!myUser.comparePassword(body.password)) {
            return ResponseEntity.badRequest().body(Message("Invalid data!"))
        }

        val issuer = myUser.id.toString()

        val jwt: String = Jwts.builder()
            .setIssuer(issuer)
            .setExpiration(Date(System.currentTimeMillis() + 60 * 24 * 1000))  // 1 day
            .signWith(SignatureAlgorithm.HS512, "verySecretString").compact()

        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true

        response.addCookie(cookie)

        return ResponseEntity.ok("Success")
    }

    @GetMapping("user")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("unauthenticated"))
            }

            val body = Jwts.parser().setSigningKey("verySecretString").parseClaimsJws(jwt).body

            return ResponseEntity.ok(this.userService.getById(body.issuer.toInt()))

        } catch (e: Exception) {
            return ResponseEntity.status(401).body(Message("unauthenticated"))
        }
    }

    @PostMapping("logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "")
        cookie.maxAge = 0

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("success"))
    }
}