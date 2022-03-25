package br.com.rodrigorodrigues.todoproject.repository;

import br.com.rodrigorodrigues.todoproject.model.Todo;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoRepository extends JpaRepository<Todo,Long> {

}
