package com.example.pis.services

import com.example.pis.models.MyHistory
import com.example.pis.models.MyTask
import com.example.pis.repositories.HistoryRepository
import org.springframework.stereotype.Service

@Service
class HistoryService(private val historyRepository: HistoryRepository) {

    fun save(history: MyHistory): MyHistory = this.historyRepository.save(history)
}