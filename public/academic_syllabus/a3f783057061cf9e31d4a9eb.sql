-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 02, 2019 at 10:17 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exam_grades`
--

CREATE TABLE `tbl_exam_grades` (
  `grade_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `name` longtext COLLATE utf8_unicode_ci,
  `mark_from` int(11) DEFAULT NULL,
  `mark_upto` int(11) DEFAULT NULL,
  `comment` longtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_exam_grades`
--

INSERT INTO `tbl_exam_grades` (`grade_id`, `class_id`, `section_id`, `exam_id`, `name`, `mark_from`, `mark_upto`, `comment`) VALUES
(1, 1, 0, 16, 'A+', 46, 50, ''),
(2, 1, 0, 16, 'A', 36, 45, ''),
(3, 1, 0, 16, 'B+', 26, 35, ''),
(4, 1, 0, 16, 'B', 21, 25, ''),
(5, 1, 0, 16, 'C', 0, 20, ''),
(6, 1, 0, 17, 'A+', 91, 100, ''),
(7, 1, 0, 17, 'A', 71, 90, ''),
(8, 1, 0, 17, 'B+', 51, 70, ''),
(9, 1, 0, 17, 'B', 41, 50, ''),
(10, 1, 0, 17, 'C', 0, 40, '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exam_master`
--

CREATE TABLE `tbl_exam_master` (
  `exam_id` int(11) NOT NULL,
  `exam_code` varchar(55) DEFAULT NULL,
  `class_id` int(11) NOT NULL,
  `exam_name` varchar(30) NOT NULL,
  `section_id` int(55) DEFAULT '0',
  `session_year` varchar(10) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_exam_master`
--

INSERT INTO `tbl_exam_master` (`exam_id`, `exam_code`, `class_id`, `exam_name`, `section_id`, `session_year`, `created_date`, `updated_date`) VALUES
(16, 'FA1', 1, 'FORMATIVE-I', 0, '2018-2019', '2019-01-02 12:26:07', '2019-01-02 12:26:07'),
(17, 'SM1', 1, 'SUMMATIVE-I', 0, '2018-2019', '2019-01-02 12:32:37', '2019-01-02 12:32:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exam_schedule`
--

CREATE TABLE `tbl_exam_schedule` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `date` longtext COLLATE utf8_unicode_ci,
  `totalmarks` int(11) NOT NULL,
  `session_year` longtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_exam_schedule`
--

INSERT INTO `tbl_exam_schedule` (`id`, `exam_id`, `class_id`, `subject_id`, `section_id`, `date`, `totalmarks`, `session_year`) VALUES
(1, 16, 1, 1, 1, '02-01-2019', 50, '2018-2019'),
(2, 16, 1, 2, 1, '03-01-2019', 50, '2018-2019'),
(3, 16, 1, 3, 1, '04-01-2019', 50, '2018-2019'),
(4, 16, 1, 4, 1, '09-01-2019', 50, '2018-2019'),
(5, 17, 1, 1, 1, '16-01-2019', 100, '2018-2019'),
(6, 17, 1, 2, 1, '17-01-2019', 100, '2018-2019'),
(7, 17, 1, 3, 1, '18-01-2019', 100, '2018-2019'),
(8, 17, 1, 4, 1, '18-01-2019', 100, '2018-2019'),
(9, 17, 1, 12, 1, '23-01-2019', 100, '2018-2019');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_marks`
--

CREATE TABLE `tbl_marks` (
  `mark_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `subject_type` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `exam_id` int(55) DEFAULT NULL,
  `exam_code` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `marks_obtained` decimal(10,2) NOT NULL DEFAULT '0.00',
  `marks` text COLLATE utf8_unicode_ci NOT NULL,
  `othermarks` text COLLATE utf8_unicode_ci,
  `comment` longtext COLLATE utf8_unicode_ci,
  `mark_total` int(11) NOT NULL,
  `year` longtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_marks`
--

INSERT INTO `tbl_marks` (`mark_id`, `student_id`, `subject_id`, `subject_type`, `class_id`, `section_id`, `exam_id`, `exam_code`, `marks_obtained`, `marks`, `othermarks`, `comment`, `mark_total`, `year`) VALUES
(1, 328, 1, 1, 1, 1, 16, 'FA1', '50.00', '{\"Childrens_Participation_Responses\":10,\"Written_Work\":20,\"Project_Work\":10,\"Slip_Test\":10}', NULL, NULL, 50, '2018-2019'),
(2, 329, 1, 1, 1, 1, 16, 'FA1', '48.00', '{\"Childrens_Participation_Responses\":12,\"Written_Work\":11,\"Project_Work\":12,\"Slip_Test\":13}', NULL, NULL, 50, '2018-2019'),
(3, 334, 1, 1, 1, 1, 16, 'FA1', '49.00', '{\"Childrens_Participation_Responses\":10,\"Written_Work\":12,\"Project_Work\":13,\"Slip_Test\":14}', NULL, NULL, 50, '2018-2019'),
(4, 328, 1, 1, 1, 1, 17, 'SM1', '80.00', '{\"EXAM_80percentage\":80}', NULL, NULL, 100, '2018-2019'),
(5, 329, 1, 1, 1, 1, 17, 'SM1', '81.00', '{\"EXAM_80percentage\":81}', NULL, NULL, 100, '2018-2019'),
(6, 334, 1, 1, 1, 1, 17, 'SM1', '95.00', '{\"EXAM_80percentage\":95}', NULL, NULL, 100, '2018-2019'),
(7, 328, 12, 0, 1, 1, 17, 'SM1', '100.00', '{\"Value_Edu_-_Life_Skills\":30,\"Art_-_cultural_Edu\":10,\"Health_-_Physical_Edu\":20,\"Work_-_Computer_Edu\":40}', NULL, NULL, 100, '2018-2019'),
(8, 329, 12, 0, 1, 1, 17, 'SM1', '60.00', '{\"Value_Edu_-_Life_Skills\":20,\"Art_-_cultural_Edu\":20,\"Health_-_Physical_Edu\":10,\"Work_-_Computer_Edu\":10}', NULL, NULL, 100, '2018-2019'),
(9, 334, 12, 0, 1, 1, 17, 'SM1', '40.00', '{\"Value_Edu_-_Life_Skills\":10,\"Art_-_cultural_Edu\":10,\"Health_-_Physical_Edu\":10,\"Work_-_Computer_Edu\":10}', NULL, NULL, 100, '2018-2019'),
(10, 328, 2, 1, 1, 1, 17, 'SM1', '85.00', '{\"EXAM_80percentage\":85}', NULL, NULL, 100, '2018-2019'),
(11, 329, 2, 1, 1, 1, 17, 'SM1', '90.00', '{\"EXAM_80percentage\":90}', NULL, NULL, 100, '2018-2019'),
(12, 334, 2, 1, 1, 1, 17, 'SM1', '95.00', '{\"EXAM_80percentage\":95}', NULL, NULL, 100, '2018-2019'),
(13, 328, 3, 1, 1, 1, 17, 'SM1', '95.00', '{\"EXAM_80percentage\":95}', NULL, NULL, 100, '2018-2019'),
(14, 329, 3, 1, 1, 1, 17, 'SM1', '85.00', '{\"EXAM_80percentage\":85}', NULL, NULL, 100, '2018-2019'),
(15, 334, 3, 1, 1, 1, 17, 'SM1', '95.00', '{\"EXAM_80percentage\":95}', NULL, NULL, 100, '2018-2019'),
(16, 328, 4, 1, 1, 1, 17, 'SM1', '40.00', '{\"EXAM_80percentage\":40}', NULL, NULL, 100, '2018-2019'),
(17, 329, 4, 1, 1, 1, 17, 'SM1', '65.00', '{\"EXAM_80percentage\":65}', NULL, NULL, 100, '2018-2019'),
(18, 334, 4, 1, 1, 1, 17, 'SM1', '30.00', '{\"EXAM_80percentage\":30}', NULL, NULL, 100, '2018-2019');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_exam_grades`
--
ALTER TABLE `tbl_exam_grades`
  ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `tbl_exam_master`
--
ALTER TABLE `tbl_exam_master`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `tbl_exam_schedule`
--
ALTER TABLE `tbl_exam_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_marks`
--
ALTER TABLE `tbl_marks`
  ADD PRIMARY KEY (`mark_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_exam_grades`
--
ALTER TABLE `tbl_exam_grades`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_exam_master`
--
ALTER TABLE `tbl_exam_master`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_exam_schedule`
--
ALTER TABLE `tbl_exam_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_marks`
--
ALTER TABLE `tbl_marks`
  MODIFY `mark_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
