package com.example.pis.controller

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.RequestBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders

@ExtendWith(SpringExtension::class)
@WebMvcTest(AuthController::class)
class AuthControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc
    val baseUrl = "/api/register"

    @Test
    fun `should return hello world message`() {
        // when / then
        val request: RequestBuilder = MockMvcRequestBuilders.get(baseUrl)
        val result: MvcResult = mockMvc.perform(request).andReturn()

        Assertions.assertEquals(
            "Hello, world! This is endpoint. How ya doin'?",
            result.response.contentAsString
        )
    }
}