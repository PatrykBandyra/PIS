package com.example.pis.scheduling

import com.example.pis.models.MyHistory
import com.example.pis.services.HistoryService
import com.example.pis.services.UserService
import org.jsoup.Jsoup
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.io.IOException
import javax.transaction.Transactional

@Component
class ScrapeTask(private val historyService: HistoryService, private val userService: UserService) {

    companion object {
        @JvmStatic
        private val log = LoggerFactory.getLogger(ScrapeTask::class.java)
    }

    fun scrapeText(url: String, query: String): String {
        try {
            val response = Jsoup.connect(url).followRedirects(false).execute()

            if (response.statusCode() == 200) {
                val doc = Jsoup.connect(url).get()
                return doc.select(query).text()
            }

            return ""

        } catch (e: IOException) {
            e.printStackTrace()
            return ""
        }
    }

    fun scrapeHtml(url: String, query: String): String {
        try {
            val response = Jsoup.connect(url).followRedirects(false).execute()

            if (response.statusCode() == 200) {
                val doc = Jsoup.connect(url).get()
                return doc.select(query).html()
            }

            return ""

        } catch (e: IOException) {
            e.printStackTrace()
            return ""
        }

    }

    @Scheduled(cron = "30 36 15 * * ?", zone = "Europe/Warsaw")  // s min h d m
    @Transactional
    fun scrape() {

        log.info("Scrapping task started")

        for (user in this.userService.getAll()) {
            for (task in user.tasks) {
                if (task.type == "t") {
                    try {
                        val scrapedText = scrapeText(task.url, task.query)
                        val history = MyHistory()
                        history.content = scrapedText
                        history.task = task
                        this.historyService.save(history)
                    } catch (e: Exception) {
                        log.error("Could not execute statement. Content size too big.")
                    }


                } else if (task.type == "h") {
                    try {
                        val scrapedHtml = scrapeHtml(task.url, task.query)
                        val history = MyHistory()
                        history.content = scrapedHtml
                        history.task = task
                        this.historyService.save(history)
                    } catch (e: Exception) {
                        log.error("Could not execute statement. Content size too big.")
                    }
                }
            }
        }

        log.info("Scrapping task ended")

    }
}