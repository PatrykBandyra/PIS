package com.example.pis.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.CreatedBy
import javax.persistence.*


@Entity
@Table(name = "MY_TASK")
class MyTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column
    var url = ""

    @Column
    var query = ""

    @Column(length = 1)
    var type = ""

    @Column
    var frequency: Int = 0

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MY_USER_ID")
    var user: MyUser = MyUser()

    @OneToMany(mappedBy = "task",  cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var history: MutableList<MyHistory> = mutableListOf()
}