package com.example.pis.controller

import it.skrape.core.document
import it.skrape.core.htmlDocument
import it.skrape.fetcher.HttpFetcher
import it.skrape.fetcher.extractIt
import it.skrape.fetcher.response
import it.skrape.fetcher.skrape
import it.skrape.selects.html5.h1
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


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

    @GetMapping("/all/text")
    fun extractAllText() = skrape(HttpFetcher) {
        request {
            url = "https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II"
        }
        response {
            AllDataClass(
                httpStatusCode = status { code },
                httpStatusMessage = status { message },
                allText = document.text
            )
        }
    }

//    @GetMapping("/all/text")
//    fun extractAllText(@RequestParam(name = "url") _url: String) = skrape(HttpFetcher) {
//        request {
//            url = _url
//        }
//        response {
//            AllDataClass(
//                httpStatusCode = status { code },
//                httpStatusMessage = status { message },
//                allText = document.text
//            )
//        }
//    }

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
