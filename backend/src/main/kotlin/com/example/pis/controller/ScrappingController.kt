package com.example.pis.controller

import com.example.pis.dtos.ScrapedContent
import org.jsoup.Jsoup
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.io.IOException

@RestController
@RequestMapping("scrape")
class ScrappingController {

    @GetMapping("text")
    fun extractText(@RequestParam(name = "url") url: String,
                    @RequestParam(name = "query") query: String): ScrapedContent? {
        try {
            val response = Jsoup.connect(url).followRedirects(false).execute()

                if (response.statusCode() == 200) {
                    val doc = Jsoup.connect(url).get()
                    return ScrapedContent(
                        response.statusCode(),
                        response.statusMessage(),
                        doc.select(query).text()
                    )
                }

                return ScrapedContent(
                    response.statusCode(),
                    response.statusMessage(),
                    null
                )

        } catch (e: IOException) {
            e.printStackTrace()
            return null
        }

    }

    @GetMapping("html")
    fun extractHtml(@RequestParam(name = "url") url: String,
                    @RequestParam(name = "query") query: String): ScrapedContent? {
        try {
            val response = Jsoup.connect(url).followRedirects(false).execute()

            if (response.statusCode() == 200) {
                val doc = Jsoup.connect(url).get()
                return ScrapedContent(
                    response.statusCode(),
                    response.statusMessage(),
                    doc.select(query).html()
                )
            }

            return ScrapedContent(
                response.statusCode(),
                response.statusMessage(),
                null
            )

        } catch (e: IOException) {
            e.printStackTrace()
            return null
        }

    }
}