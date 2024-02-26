package server.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*

@Entity
@Table(name="client")
class Client(
    var firstName: String,
    var lastName: String,

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    @JsonBackReference
    var advisor: Advisor,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
)