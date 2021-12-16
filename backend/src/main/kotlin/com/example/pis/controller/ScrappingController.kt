package com.example.pis.controller

import it.skrape.core.document
import it.skrape.core.htmlDocument
import it.skrape.fetcher.skrape
import it.skrape.fetcher.response
import it.skrape.selects.eachHref
import it.skrape.selects.eachText
import it.skrape.fetcher.HttpFetcher
import it.skrape.fetcher.extractIt
import it.skrape.fetcher.request.Json
import it.skrape.matchers.toBe
import it.skrape.matchers.toBePresentExactlyTwice
import it.skrape.selects.and
import it.skrape.selects.html5.*
import org.springframework.web.bind.annotation.*
import javax.management.Query.div


@RestController
@RequestMapping("scrape")
class ScrappingController {

//    data class AllDataClass(
//        val httpStatusCode: Int,
//        val httpStatusMessage: String,
//        val paragraph: String,
//        val allParagraphs: List<String>,
//        val allLinks: List<String>
//    )

    data class AllDataClass(
        val httpStatusCode: Int,
        val httpStatusMessage: String,
        val allText: String
    )

    @GetMapping("/all")
    fun extractAllText(@RequestParam(name = "url") _url: String) = skrape(HttpFetcher) {
        request {
            url = _url
        }
        response {
            AllDataClass(
                httpStatusCode = status { code },
                httpStatusMessage = status { message },
                allText = document.text
            )
        }
    }

    data class H1ByIdDataClass(
        var httpStatusCode: Int = 0,
        var httpStatusMessage: String = "",
        var h1Content: String = ""

    )

    @GetMapping("/h1/id")
    fun extractH1ById(@RequestParam(name = "url") _url: String, @RequestParam(name = "id") _id: String) =
        skrape(HttpFetcher) {
            request {
                url = _url
            }
            extractIt<H1ByIdDataClass> {
                it.httpStatusCode = status { code }
                it.httpStatusMessage = status { message }
                htmlDocument {
                    h1 {
                        withId = _id
                        it.h1Content = findFirst { text }
                    }
                }
            }
        }
}
