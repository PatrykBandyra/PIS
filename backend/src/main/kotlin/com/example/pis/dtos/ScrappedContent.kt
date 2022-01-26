package com.example.pis.dtos

data class ScrapedContent(
    val httpStatusCode: Int,
    val httpStatusMessage: String,
    val content: String?
)
