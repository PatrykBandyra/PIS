package com.example.pis.repositories

import com.example.pis.models.MyHistory
import org.springframework.data.jpa.repository.JpaRepository

interface HistoryRepository : JpaRepository<MyHistory, Int> {
}