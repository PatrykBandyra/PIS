package com.example.pis.controller
//
//import org.jsoup.Jsoup
//import org.jsoup.nodes.Element
//import org.springframework.web.bind.annotation.GetMapping
//import org.springframework.web.bind.annotation.RequestMapping
//import org.springframework.web.bind.annotation.RequestParam
//import org.springframework.web.bind.annotation.RestController
//import java.io.IOException
//
//
//@RestController
//@RequestMapping("scrape")
//class Scrapping {
//
//////    data class AllDataClass(
//////        val httpStatusCode: Int,
//////        val httpStatusMessage: String,
//////        val paragraph: String,
//////        val allParagraphs: List<String>,
//////        val allLinks: List<String>
//////    )
////
////    data class AllDataClass(
////        val httpStatusCode: Int,
////        val httpStatusMessage: String,
////        val allText: String
////    )
////
////    @GetMapping("/all/text")
////    fun extractAllText() = skrape(HttpFetcher) {
////        request {
////            url = "https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II"
////        }
////        response {
////            AllDataClass(
////                httpStatusCode = status { code },
////                httpStatusMessage = status { message },
////                allText = document.text
////            )
////        }
////    }
////
//////    @GetMapping("/all/text")
//////    fun extractAllText(@RequestParam(name = "url") _url: String) = skrape(HttpFetcher) {
//////        request {
//////            url = _url
//////        }
//////        response {
//////            AllDataClass(
//////                httpStatusCode = status { code },
//////                httpStatusMessage = status { message },
//////                allText = document.text
//////            )
//////        }
//////    }
////
////    data class H1ByIdDataClass(
////        var httpStatusCode: Int = 0,
////        var httpStatusMessage: String = "",
////        var h1Content: String = ""
////
////    )
////
////    @GetMapping("/h1/id")
////    fun extractH1ById(@RequestParam(name = "url") _url: String, @RequestParam(name = "id") _id: String) =
////        skrape(HttpFetcher) {
////            request {
////                url = _url
////            }
////            extractIt<H1ByIdDataClass> {
////                it.httpStatusCode = status { code }
////                it.httpStatusMessage = status { message }
////                htmlDocument {
////                    h1 {
////                        withId = _id
////                        it.h1Content = findFirst { text }
////                    }
////                }
////            }
////        }
//
//
//    data class ScrapedContent(
//        val httpStatusCode: Int,
//        val httpStatusMessage: String,
//        val content: String?
//    )
//
//    @GetMapping("")
//    fun extractBySelector(@RequestParam(name = "url") url: String,
//                          @RequestParam(name = "query") query: String): ScrapedContent? {
//        try {
//            val response = Jsoup.connect(url).followRedirects(false).execute()
//
//                if (response.statusCode() == 200) {
//                    val doc = Jsoup.connect(url).get()
//                    return ScrapedContent(
//                        response.statusCode(),
//                        response.statusMessage(),
//                        doc.select(query).text()
//                    )
//                }
//
//                return ScrapedContent(
//                    response.statusCode(),
//                    response.statusMessage(),
//                    null
//                )
//
//        } catch (e: IOException) {
//            e.printStackTrace()
//            return null
//        }
//
//    }
//}
//
//fun main() {
//
//    data class ScrapedContent(
//        val httpStatusCode: Int,
//        val httpStatusMessage: String,
//        val content: Element?
//    )
//
//    try {
//
//        val url = "https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II"
//        val query = "#mw-content-text > div.mw-parser-output > p:nth-child(18)"
//
//        val response = Jsoup.connect(url).followRedirects(false).execute()
//
//        if (response.statusCode() == 200) {
//            val doc = Jsoup.connect(url).get()
//            println( ScrapedContent(
//                response.statusCode(),
//                response.statusMessage(),
//                doc.select(query).select(":matchText").first()
//            ))
//
//        } else {
//            println(ScrappingController.ScrapedContent(
//                response.statusCode(),
//                response.statusMessage(),
//                null
//            ))
//        }
//
//    } catch (e: IOException) {
//        e.printStackTrace()
//
//    }
//
//}
//
