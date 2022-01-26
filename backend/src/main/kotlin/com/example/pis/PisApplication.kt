package com.example.pis

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class PisApplication

fun main(args: Array<String>) {
	runApplication<PisApplication>(*args)
}
