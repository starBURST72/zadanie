using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AnswersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                       select answersId,regId,answer1,answer2,answer3,answer4,answer5 from answers";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Answers ans)
        {
            string query = @"
                        insert into answers (regId,answer1,answer2,answer3,answer4,answer5) values
                                                    (@regId,@qId,@answer1,@answer2,@answer3,@answer4,@answer5);
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@regId", ans.regId);
                    myCommand.Parameters.AddWithValue("@answer1", ans.answer1);
                    myCommand.Parameters.AddWithValue("@answer2", ans.answer2);
                    myCommand.Parameters.AddWithValue("@answer3", ans.answer3);
                    myCommand.Parameters.AddWithValue("@answer4", ans.answer4);
                    myCommand.Parameters.AddWithValue("@answer5", ans.answer5);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Answers ans)
        {
            string query = @"
                        update answer set 
                        regId =@regId,
                        answer1=@answer1,
                        answer1=@answer2,
                        answer1=@answer3,
                        answer1=@answer4,   
                        answer1=@answer5,
                   
                        where answerId=@answerId;
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@answerId", ans.answersId);
                    myCommand.Parameters.AddWithValue("@regId", ans.regId);
                    myCommand.Parameters.AddWithValue("@answer1", ans.answer1);
                    myCommand.Parameters.AddWithValue("@answer2", ans.answer2);
                    myCommand.Parameters.AddWithValue("@answer3", ans.answer3);
                    myCommand.Parameters.AddWithValue("@answer4", ans.answer4);
                    myCommand.Parameters.AddWithValue("@answer5", ans.answer5);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }



        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                        delete from answer 
                        where answerId=@answerId;
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@answerId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
