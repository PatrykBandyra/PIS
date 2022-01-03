package com.example.pis.services

import com.example.pis.repositories.HistoryRepository
import org.springframework.stereotype.Service

@Service
class HistoryService(private val historyRepository: HistoryRepository) {
}