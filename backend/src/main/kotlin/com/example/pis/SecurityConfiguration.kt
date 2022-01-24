package com.example.pis

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@Configuration
class SecurityConfiguration : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(httpSecurity: HttpSecurity) {
        httpSecurity.authorizeRequests { authorize -> authorize
            .mvcMatchers(HttpMethod.GET, "/api").permitAll()
            .mvcMatchers(HttpMethod.GET, "/scrape").permitAll()

        }
    }
}