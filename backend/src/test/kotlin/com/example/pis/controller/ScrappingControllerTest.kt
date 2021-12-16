package com.example.pis.controller

import com.fasterxml.jackson.module.kotlin.jsonMapper
import org.json.JSONObject
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.junit.jupiter.params.ParameterizedTest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity.status
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.RequestBuilder
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import java.nio.charset.StandardCharsets


//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
//class ScrappingControllerTest2 {
//
//    @Test
//    fun `should return content of h1 with given id`(@Autowired webClient: WebTestClient) {
//        // given
//        val url = "https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II"
//        val id = "firstHeading"
//        // expected
//        val expectedContent = "Jan Paweł II"
//
//        webClient
//            .get().uri("/scrape/all/text")
//            .accept(MediaType.APPLICATION_JSON)
//            .exchange()
//            .expectStatus().isOk
//            .expectBody().jsonPath("allText").exists()
//    }
//}

@ExtendWith(SpringExtension::class)
@WebMvcTest(ScrappingController::class)
class ScrappingControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun `should return content of h1 with given id`() {
        // given
        val url = "https://en.wikipedia.org/wiki/Pope_John_Paul_II"
        val id = "firstHeading"

        val request: RequestBuilder = MockMvcRequestBuilders.get("/scrape/h1/id/?url=$url&id=$id")
        val result: MvcResult = mockMvc.perform(request).andReturn()

        Assertions.assertEquals(
            "{\"httpStatusCode\":200,\"httpStatusMessage\":\"OK\",\"h1Content\":\"Pope John Paul II\"}",
            result.response.contentAsString
        )

    }
}

