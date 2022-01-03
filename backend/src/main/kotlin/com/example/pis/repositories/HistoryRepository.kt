package com.example.pis.repositories

import com.example.pis.models.MyHistory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface HistoryRepository : JpaRepository<MyHistory, Int> {
}