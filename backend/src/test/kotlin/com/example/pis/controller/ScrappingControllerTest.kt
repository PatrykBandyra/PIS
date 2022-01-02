package com.example.pis.controller

import io.ktor.client.request.*
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*


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


@WebMvcTest
class ScrappingControllerTest(@Autowired val mockMvc: MockMvc) {

    @Test
    fun `should return content of h1 with given id`() {
        // given
        val url = "https://en.wikipedia.org/wiki/Pope_John_Paul_II"
        val id = "firstHeading"

        val expected = "Pope John Paul II"

        mockMvc.perform(MockMvcRequestBuilders.get("/scrape/h1/id/?url=$url&id=$id")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("h1Content").value(expected))
    }
}

