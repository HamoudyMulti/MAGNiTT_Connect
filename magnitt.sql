-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2021 at 05:10 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magnitt`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 1,
  `type` varchar(60) NOT NULL,
  `industry` varchar(60) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `size`, `type`, `industry`, `description`) VALUES
(1, 'MAGNiTT', 20, 'Nonprofit', 'Transport', 'With years of data gathering and building relationships within the emerging markets ecosystem, MAGNiTT is the only data analytics platform with insights that meet the standards of the most demanding clients.'),
(2, 'Google', 200, 'IT', 'Computer', 'A problem isn\'t truly solved until it\'s solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.'),
(3, 'Amazon', 500, 'Public Company', 'Internet', 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We are driven by the excitement of building technologies, inventing products, and providing services that change lives.'),
(46, 'Apple', 120, 'Public Company', 'Consumer Electronics', 'We’re a diverse collective of thinkers and doers, continually reimagining what’s possible to help us all do what we love in new ways. And the same innovation that goes into our products also applies to our practices — strengthening our commitment to leave the world better than we found it. This is where your work can make a difference in people’s lives. Including your own.'),
(47, 'Microsoft', 450, 'Privately Held', 'Computer Software', 'ECM Consultancy, Implementation Services, Support & Maintenance, ECM Education Services, Automation, Banking Process Automation, EIM, Backlog services, Content Management, Legal Case Management, Policy & Procedure, Contract Management, Correspondence Workspace'),
(48, 'Facebook', 1, 'Public Company', 'Internet', 'The Facebook company is now Meta. Meta builds technologies that help people connect, find communities, and grow businesses. When Facebook launched in 2004, it changed the way people connect. Apps like Messenger, Instagram and WhatsApp further empowered billions around the world.');

-- --------------------------------------------------------

--
-- Table structure for table `company_connections`
--

CREATE TABLE `company_connections` (
  `id` int(11) NOT NULL,
  `company_first` int(11) NOT NULL,
  `company_second` int(11) NOT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_connections`
--

INSERT INTO `company_connections` (`id`, `company_first`, `company_second`, `status`) VALUES
(5, 1, 2, 'connected'),
(6, 2, 3, 'connected'),
(7, 48, 2, 'connected'),
(9, 48, 1, 'connected'),
(12, 47, 48, 'pending'),
(13, 3, 1, 'pending'),
(14, 3, 48, 'pending'),
(17, 1, 2, 'pending'),
(19, 1, 46, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `company_to_user_request`
--

CREATE TABLE `company_to_user_request` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_to_user_request`
--

INSERT INTO `company_to_user_request` (`id`, `company_id`, `user_id`, `status`) VALUES
(14, 1, 66, 'pending'),
(16, 47, 66, 'pending'),
(18, 2, 66, 'pending'),
(20, 3, 66, 'pending'),
(22, 48, 66, 'pending'),
(38, 48, 67, 'pending'),
(40, 3, 67, 'pending'),
(41, 47, 67, 'pending'),
(42, 1, 61, 'pending'),
(43, 1, 67, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `company_role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `company_id`, `company_role`) VALUES
(57, 'Mohamad Salhani', 'mim25@mail.aub.edu', '$2b$10$ZL0MNE.iQ2bdQ4KsC66AZ.TovdCEfcJZT4PhVFu3cUNDsKg0bs3cG', 1, 'owner'),
(59, 'Test Salhani', 'test@gmail.com', '$2b$10$ZL0MNE.iQ2bdQ4KsC66AZ.TovdCEfcJZT4PhVFu3cUNDsKg0bs3cG', 1, 'member'),
(61, 'John Smith', 'msalhani@gmail.com', '$2b$10$tYrCwodzx3mxUJFoeCKkmOFqrDGz2qkECXT.o3PZkcGIItOJFqelm', 47, 'member'),
(63, 'Adam Baker', 'adambaker@gmail.com', '$2b$10$fah8ZCdtwNWshjLL0tBSTudLN2oULXfzLdthxpDDn7uOiIRmCqCfK', 1, 'member'),
(64, 'Frank Hills', 'frankhills@gmail.com', '$2b$10$ppvqHpTE2l343K2cPvj7uuvKS1r7ZSgxxfaAN0hiwbiPN7R1FLtxu', 1, 'member'),
(65, 'Mason Cooper', 'masoncooper@gmail.com', '$2b$10$HD3MLPOO7.aOS87JDEkFAeveppk3IgZzMF/TK03xYJC6aWETMeC4u', 1, 'member'),
(66, 'Trott White', 'trottwhite@gmail.com', '$2b$10$iZEFS/icYnJ1UgiABiDKb.hp.jT.eIx5KeDuZFtsG26.9T4ITpb1m', NULL, NULL),
(67, 'Valdo Quinn', 'valdoquinn@gmail.com', '$2b$10$A2mk7M11niYkMH/kdAvW5uHczPm8uhMhyFNT.wuLfRqdAviQe79dm', 0, ''),
(70, 'Google Guy', 'googleguy@gmail.com', '$2b$10$pDQBnBsmZWdKmyYkBsdtu.nw1nltlmAUt4YRIk9Omem0f.wSRaepS', 2, 'owner'),
(71, 'Microsoft Guy', 'microsoftguy@gmail.com', '$2b$10$Jy9L15hw2Iyok/3m8xNR8ecGVk90IRHvPLTW7euTCuT5PVvRc518W', 47, 'owner'),
(72, 'Apple Guy', 'appleguy@gmail.com', '$2b$10$d.muh.mPy1kx5kNdtS.sI.nLI.RSeXIxyVghq5XlfKZm0QxuKzK7G', 0, ''),
(73, 'Amazon Guy', 'amazonguy@gmail.com', '$2b$10$C3SOUU8dllGZa5I.JQkuverzJ7hHHgiyqGCQQ.6PQo10kryxWLsdq', 3, 'owner'),
(74, 'Facebook Guy', 'facebookguy@gmail.com', '$2b$10$N.ynv723jl61ky4V4Z0zEOz3zhrsxf1VdT6uqQe/rFou4AWR8E2Pm', 48, 'owner');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_name` (`company_name`);

--
-- Indexes for table `company_connections`
--
ALTER TABLE `company_connections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_to_user_request`
--
ALTER TABLE `company_to_user_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `company_connections`
--
ALTER TABLE `company_connections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `company_to_user_request`
--
ALTER TABLE `company_to_user_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
