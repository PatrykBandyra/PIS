package com.example.pis.models

import org.hibernate.annotations.CreationTimestamp
import java.sql.Timestamp
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.*
import javax.persistence.*


@Entity
@Table(name = "MY_HISTORY")
class MyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column(length = 4000)
    var content = ""

    @Column
    var localDate: Date? = null

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MY_TASK_ID")
    var task: MyTask = MyTask()

}
