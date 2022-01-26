package com.example.pis.controller

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.net.URI


@WebMvcTest(ScrappingController::class)
class ScrappingControllerTest(@Autowired val mockMvc: MockMvc) {

    @Test
    fun `should return text content`() {
        // given
        val url = "https://en.wikipedia.org/wiki/Pope_John_Paul_II"
        val query = "%23firstHeading"

        val expected = "Pope John Paul II"

        mockMvc.perform(MockMvcRequestBuilders.get(URI("/scrape/text/?url=$url&query=$query"))
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("content").value(expected))
    }

    @Test
    fun `should return html content`() {
        // given
        val url = "https://en.wikipedia.org/wiki/Pope_John_Paul_II"
        val query = "%23firstHeading"

        val expected = "Pope John Paul II"

        mockMvc.perform(MockMvcRequestBuilders.get(URI("/scrape/html/?url=$url&query=$query"))
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("content").value(expected))
    }
}

