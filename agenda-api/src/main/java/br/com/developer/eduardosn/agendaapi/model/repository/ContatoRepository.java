package br.com.developer.eduardosn.agendaapi.model.repository;

import br.com.developer.eduardosn.agendaapi.mode.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
