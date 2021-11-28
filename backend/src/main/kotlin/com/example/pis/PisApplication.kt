package com.example.pis

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PisApplication

fun main(args: Array<String>) {
	runApplication<PisApplication>(*args)
}
