package com.example.pis.models

import org.hibernate.annotations.CreationTimestamp
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*


@Entity
@Table(name = "MY_HISTORY")
class MyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column
    var content = ""

    @Column(
        updatable = false,
        columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        nullable = false
    )
    private val timestamp: Timestamp? = null

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MY_TASK_ID")
    var task: MyTask = MyTask()

}